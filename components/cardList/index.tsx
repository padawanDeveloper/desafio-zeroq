import React, { useCallback } from "react";

import Card from "@/components/card";
import styles from "@/styles/Home.module.css";
import { OfficeData, Line } from "@/types/common";

interface IProps {
    data: Array<OfficeData>;
    handleChangeState: (id: number, status: boolean) => void;
}

const reduceLines = (data: Array<Line>) =>
    data.reduce<Line>(
        (acc, item) => ({
            waiting: item.waiting + acc.waiting,
            elapsed: item.elapsed + acc.elapsed,
        }),
        { waiting: 0, elapsed: 0 }
    );

const CardList = ({ data, handleChangeState }: IProps) => {
    const handleReduceLines = useCallback(
        (data: Array<Line>) => reduceLines(data),
        []
    );

    return (
        <div className={styles.cardList}>
            {data?.map(({ name, online, id, lines }: OfficeData) => {
                const line = handleReduceLines(lines);
                return (
                    <Card
                        key={id}
                        office={name}
                        line={{
                            waiting: line.waiting,
                            elapsed: line.elapsed / lines.length,
                        }}
                        active={online}
                        onChangeState={() => handleChangeState(id, !online)}
                    />
                );
            })}
        </div>
    );
};

export default CardList;
