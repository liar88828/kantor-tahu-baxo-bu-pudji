import { UserZodType } from "@/validation/user.valid";

export const userExample: UserZodType = {
    address: "123 Elm Street, Springfield, USA", // Example address
    email: "john.doe@example.com", // Example email
    name: "John Doe", // Valid name between 1 and 100 characters
    password: "StrongP@ssword123", // Example password
    phone: "+62-123-456-7890", // Example phone
    role: "Admin", // Example role
};
