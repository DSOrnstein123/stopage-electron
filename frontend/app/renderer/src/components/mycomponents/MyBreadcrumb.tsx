import { Fragment } from "react";
import { type UIMatch, useMatches } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "../shadcn/breadcrumb";

import capitalize from "@/utils/capitalize";

const MyBreadCrumb = () => {
  const matches = useMatches() as UIMatch<
    unknown,
    { breadcrumb?: string; breadcrumbFn: (match: UIMatch) => string }
  >[];

  const crumbs = matches
    .filter(
      (match) =>
        Boolean(match.handle?.breadcrumb) || Boolean(match.handle?.breadcrumbFn)
    )
    .map((match) => {
      const label =
        match.handle?.breadcrumb ?? match.handle?.breadcrumbFn(match);
      return label;
    });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((pathname, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-base/[1.25]" href="/">
                {pathname ? capitalize(pathname) : "error"}
              </BreadcrumbLink>
            </BreadcrumbItem>

            {index < crumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { MyBreadCrumb };
