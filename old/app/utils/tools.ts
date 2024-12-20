import { randomUUID } from "crypto";

const generateUUID = () => {
    const uuid = randomUUID();
    return uuid.substring(uuid.lastIndexOf("-") + 1);
};

export function createLocationPoint(
    longitude: number,
    latitude: number
): string {
    return `POINT(${longitude} ${latitude})`;
}

export { generateUUID };
