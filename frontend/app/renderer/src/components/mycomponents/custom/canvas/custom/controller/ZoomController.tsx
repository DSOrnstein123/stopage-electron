import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ZoomController = () => {
  return (
    <Card className="absolute right-2 bottom-2 z-20 p-1">
      <Button>zoom</Button>
    </Card>
  );
};

export default ZoomController;
