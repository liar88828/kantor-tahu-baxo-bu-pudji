import { Users } from "@prisma/client";

export type TUserDB = Users
// |'email' | 'password' | 'viewer'
export type TUserCreate = Omit<Users, 'id' | "created_at" | "updated_at" | 'isValidate' | 'otp' | 'isReset' | "otpCount" | "otpRegenerate" | "otpValid">;
export type UserSearch = Pick<Users, 'name' | 'address'>;

// export type TUserUpdate = Omit<Users, "created_at" | "updated_at">;
