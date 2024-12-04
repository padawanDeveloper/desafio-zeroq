import path from "path";
import fs from "fs";

export default function handler(
    req: { method: string },
    res: { status: Function; json: Function }
) {
    setTimeout(() => {
        const filePath = path.join(process.cwd(), "public", "offices.json");

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error al leer el archivo" });
            }

            const users = JSON.parse(data);

            if (req.method === "GET") {
                return res.status(200).json(users);
            }

            res.status(405).json({
                message: `Método ${req.method} no permitido`,
            });
        });
    }, 3000);
}
