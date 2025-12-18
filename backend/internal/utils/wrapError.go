package utils

import (
	"errors"
	"fmt"
	"main/internal/generated/openapi/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ErrorCode string

type AppError struct {
	Message string
	Code    ErrorCode
	Err     error
}

const (
	ErrCodeBadRequest      ErrorCode = "BAD_REQUEST"
	ErrCodeNotFound        ErrorCode = "NOT_FOUND"
	ErrCodeConflict        ErrorCode = "CONFLICT"
	ErrCodeInternal        ErrorCode = "INTERNAL_SERVER_ERROR"
	ErrCodeUnauthorized    ErrorCode = "UNAUTHORIZED"
	ErrCodeTooManyRequests ErrorCode = "TOO_MANY_REQUESTS"
)

func httpStatusFromCode(code ErrorCode) int {
	switch code {
	case ErrCodeBadRequest:
		return http.StatusBadRequest
	case ErrCodeConflict:
		return http.StatusConflict
	case ErrCodeUnauthorized:
		return http.StatusUnauthorized
	case ErrCodeNotFound:
		return http.StatusNotFound
	default:
		return http.StatusInternalServerError
	}
}

func ErrorCodeFromHTTPStatus(statusCode int) ErrorCode {
	switch statusCode {
	case http.StatusBadRequest:
		return ErrCodeBadRequest
	case http.StatusConflict:
		return ErrCodeConflict
	case http.StatusUnauthorized:
		return ErrCodeUnauthorized
	case http.StatusNotFound:
		return ErrCodeNotFound
	default:
		return ErrCodeInternal
	}
}

func ResponseError(ctx *gin.Context, err error) {
	fmt.Printf("System Log: %+v\n", err)

	var appErr *AppError
	if errors.As(err, &appErr) {
		statusCode := httpStatusFromCode(appErr.Code)

		resp := &models.ErrorResponse{
			Code:    string(appErr.Code),
			Message: appErr.Message,
		}

		ctx.JSON(statusCode, resp)
		return
	}

	ctx.JSON(http.StatusInternalServerError, &models.ErrorResponse{
		Code:    string(ErrCodeInternal),
		Message: appErr.Message,
	})
}

func ResponseInvalidRequest(ctx *gin.Context, err error) {
	ResponseError(ctx, WrapError(ErrCodeBadRequest, "Invalid request body", err))
}

func WrapError(code ErrorCode, msg string, err error) error {
	return &AppError{
		Code:    code,
		Message: msg,
		Err:     err,
	}
}

func (appErr *AppError) Error() string {
	if appErr.Err != nil {
		return fmt.Sprintf("[%s] %s\nCause: %s", appErr.Code, appErr.Message, appErr.Err)
	}

	return fmt.Sprintf("[%s] %s", appErr.Code, appErr.Message)
}
