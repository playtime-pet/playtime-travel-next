import { randomUUID } from "crypto";

const generateUUID = () => {
    const uuid = randomUUID();
    return uuid.substring(uuid.lastIndexOf("-") + 1);
};

function createLocationPoint(longitude: number, latitude: number): string {
    return `POINT(${longitude} ${latitude})`;
}

export { generateUUID, createLocationPoint };
