import { randomUUID } from "crypto";

const generateUUID = () => {
    const uuid = randomUUID();
    return uuid.substring(uuid.lastIndexOf("-") + 1);
};

export { generateUUID };
