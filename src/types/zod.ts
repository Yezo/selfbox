import { z } from "zod";

export const emailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .min(5, {
    message: "Email must be made of at least 5 characters",
  })
  .max(64, {
    message: "Email must be made of at most 64 characters",
  })
  .email({
    message: "Please enter a valid email address",
  });

export const signInWithPasswordSchema = z.object({
  email: emailSchema,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(8, {
    message: "Password must be made of at least 8 characters",
  })
  .max(256, {
    message: "Password must be made of at most 256 characters",
  });

export const signUpWithPasswordSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: emailSchema,
  password: passwordSchema.regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    {
      message:
        "Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character",
    },
  ),
});

export const deleteBioSchema = z.object({
  id: z.number().int({
    message: "ID must be an integer.",
  }),
  userId: z.string().min(2, {
    message: "userId must be at least 2 characters.",
  }),
});

export const bioSchema = z.object({
  bio: z.string().min(2, {
    message: "Bio must be at least 2 characters.",
  }),
});

export const updateUsernameSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export const deleteSongSchema = z.object({
  id: z.number().int({
    message: "ID must be an integer.",
  }),
  userId: z.string().min(2, {
    message: "userId must be at least 2 characters.",
  }),
});

export const songSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  artist: z.string().min(2, {
    message: "artist must be at least 2 characters.",
  }),
  album: z.string().min(2, {
    message: "album must be at least 2 characters.",
  }),
  duration: z.string().min(2, {
    message: "duration must be at least 2 characters.",
  }),
});

export const heroInputSchema = z.object({
  username: z.string().max(25, {
    message: "Username cannot have more than 25 characters.",
  }),
});

export type heroInputSchemaInput = z.infer<typeof heroInputSchema>;

export type SignUpWithPasswordFormInput = z.infer<
  typeof signUpWithPasswordSchema
>;

export type SignInWithPasswordFormInput = z.infer<
  typeof signInWithPasswordSchema
>;

export const settingsSchema = z.object({
  username: z.optional(
    z.string().max(25, {
      message: "Username cannot have more than 25 characters.",
    }),
  ),
  oldPassword: z.optional(
    passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character",
      },
    ),
  ),
  newPassword: z.optional(
    passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character",
      },
    ),
  ),
});

export type settingsSchemaType = z.infer<typeof settingsSchema>;

export const settingsProfileSchema = z.object({
  username: z.union([
    z
      .string()
      .min(3, {
        message: "Username must be at least 3 characters.",
      })
      .max(25, {
        message: "Username cannot have more than 25 characters.",
      }),
    z.literal(""),
  ]),
  name: z.union([
    z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(25, {
        message: "Username cannot have more than 25 characters.",
      }),
    z.literal(""),
  ]),
  bio: z.optional(
    z.string().max(256, {
      message: "Bio cannot have more than 256 characters.",
    }),
  ),
  pronouns: z.optional(
    z.enum(["Do not specify", "They/them", "He/him", "She/her"]),
  ),
  website: z.union([
    z
      .string()
      .min(5, {
        message: "Website must be at least 5 characters.",
      })
      .max(50, {
        message: "Website cannot have more than 50 characters.",
      })
      .url(),
    z.literal(""),
  ]),
});

export type settingsProfileSchemaType = z.infer<typeof settingsProfileSchema>;

export const socialMediaSchema = z.union([
  z
    .string()
    .min(1, {
      message: "Username must be at least 1 character(s).",
    })
    .max(30, {
      message: "Username cannot have more than 30 characters.",
    }),
  z.literal(""),
]);

export const editProfileSocialMediaSchema = z.object({
  twitter: socialMediaSchema,
  instagram: socialMediaSchema,
  linkedin: socialMediaSchema,
});

export type editProfileSocialMediaSchemaType = z.infer<
  typeof editProfileSocialMediaSchema
>;
