export type Line = {
    waiting: number;
    elapsed: number;
};

export type OfficeData = {
    name: string;
    online: boolean;
    id: number;
    lines: Array<Line>;
};
