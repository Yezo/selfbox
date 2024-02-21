"use client";

import { Button } from "@/components/ui/button";
import { deleteBioAction } from "@/db/actions/deleteBio";
import { generateToast } from "@/lib/utils";

type DeleteBioButtonProps = {
  id: number;
  userId: string;
};

export const DeleteBioButton = ({ id, userId }: DeleteBioButtonProps) => {
  const onClick = async () => {
    try {
      await deleteBioAction({ id, userId });
      generateToast({
        type: "success",
        value: "You successfully deleted an item.",
      });
    } catch (error) {
      generateToast({
        type: "error",
        value: "There was an error while processing your request.",
      });
    }
  };

  return (
    <Button variant={"destructive"} className="" onClick={onClick}>
      Delete
    </Button>
  );
};
