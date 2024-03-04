"use client";

import { useUploadThing } from "@/components/ui/uploadthing/uploadthing";
import { deleteOldAvatar, updateUserAvatar } from "@/db/actions/user";
import { generateToast } from "@/lib/utils";
import { UploadSVGIcon } from "@/styles/icons";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function CustomUploadButton({
  userId,
  oldImageURL,
}: {
  userId: string | undefined;
  oldImageURL: string | null | undefined;
}) {
  const [pending, setPending] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onUploadBegin: () => {
      setPending(true);
    },
    onClientUploadComplete: async (res) => {
      const message = await updateUserAvatar(`${res[0].url}`, userId!);

      switch (message) {
        case "success":
          generateToast({
            type: "success",
            value: "Success!",
            description: "Your avatar was successfully updated.",
          });
          setPending(false);
          await deleteOldAvatar(oldImageURL);
          break;

        case "not-found":
          generateToast({
            type: "warning",
            value: "The user could not be found.",
            description: "Please try again.",
          });
          setPending(false);
          break;

        default:
          generateToast({
            type: "error",
            value: "Something went wrong!",
            description: "Please try again.",
          });
          setPending(false);
      }
    },
    onUploadError: (error: Error) => {
      generateToast({
        type: "error",
        value: "Something went wrong!",
        description: `Make sure the file is under 2MB.`,
      });
    },
  });

  return (
    <div className="flex flex-col items-start gap-1  md:items-center md:justify-center">
      <input
        type="file"
        id="custom-input"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          if (!e.target.files) return;
          void startUpload(Array.from(e.target.files));
        }}
        disabled={pending}
        hidden
      />
      <label
        htmlFor="custom-input"
        className={`block  min-w-[135px] rounded-md border-0  px-4
            py-2 text-center font-bricolage text-sm font-medium transition-colors duration-300
           ${pending ? " cursor-not-allowed bg-slate-400 text-black/90" : "cursor-pointer bg-white text-black hover:bg-white/90"}`}
      >
        {pending ? (
          <span className="flex items-center gap-2">
            <UpdateIcon className="animate-spin" /> Uploading...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <UploadSVGIcon size={16} /> Choose file
          </span>
        )}
      </label>
      <div className="flex flex-col md:text-center">
        <div className="text-xs text-gray">Allowed Formats: JPEG, PNG</div>
        <div className="text-xs text-gray">Max size: 2MB</div>
      </div>
    </div>
  );
}
