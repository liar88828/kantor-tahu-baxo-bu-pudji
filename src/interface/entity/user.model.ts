import { Users } from "@prisma/client";

export type TUserDB = Users
export type TUserCreate = Omit<Users, 'id' | "created_at" | "updated_at">;
export type UserSearch = Pick<Users, 'name' | 'address'>;

// export type TUserUpdate = Omit<Users, "created_at" | "updated_at">;
