import React from "react";
import styles from "./Search.module.css";

interface IProps {
    onChange: () => void;
    value: string;
}

const SearchInput = ({ onChange, value }: IProps) => {
    return (
        <div className={`${styles.container} search-container `}>
            <input
                type="search"
                value={value}
                onChange={onChange}
                placeholder="Buscar sucursal..."
                className={styles.input}
            />
            <i className={`${styles.icon} material-icons `}>search</i>
        </div>
    );
};

export default SearchInput;
