import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormFieldItemProps = {
  children: React.ReactNode;
  label?: string;
  description?: string;
};

export const FormFieldItem = ({
  children,
  label,
  description,
}: FormFieldItemProps) => {
  return (
    <FormItem>
      <FormLabel className="font-bricolage">{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
