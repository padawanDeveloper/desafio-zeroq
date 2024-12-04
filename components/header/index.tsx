import Image from "next/image";
import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoWrapper}>
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={180}
                    height={38}
                    priority
                />
            </div>
        </header>
    );
};

export default Header;
