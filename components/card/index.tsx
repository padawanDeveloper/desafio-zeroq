import React from "react";
import styles from "./Card.module.css";
import { Line } from "@/types/common";
import { minutesToHHMMSS } from "@/utils/date";

type Props = {
    office: string;
    active: boolean;
    line: Line;
    onChangeState: () => void;
};

const Card = React.memo(({ office, line, active, onChangeState }: Props) => (
    <div className={styles.container} onClick={onChangeState}>
        <div
            className={`${styles.content} ${
                !active ? styles.offlineContent : ""
            }`}
        >
            <h2>{office}</h2>
        </div>
        <div
            className={`${styles.footer} ${
                !active ? styles.offlineFooter : ""
            }`}
        >
            <div className={styles.icon}>
                <i className="material-icons-outlined">person</i>
                <p>{line.waiting}</p>
            </div>
            <div className={styles.icon}>
                <i className="material-icons-outlined">schedule</i>
                <p>{minutesToHHMMSS(line.elapsed)}</p>
            </div>
        </div>
    </div>
));

export default Card;
