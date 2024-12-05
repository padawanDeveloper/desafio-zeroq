import React, { useCallback, useState } from "react";
import Head from "next/head";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";

import Header from "@/components/header";
import SearchInput from "@/components/search";
import CardList from "@/components/cardList";
import LoadingSpinner from "@/components/loading";
import useFetchData from "@/hooks/useFetchOffices";

import { OfficeData } from "@/types/common";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

interface IResponse {
    data: Array<OfficeData> | null;
    loading: boolean;
    error: string | null;
    handleChangeState: (id: number, status: boolean) => void;
}

const Home = React.memo(() => {
    const { data, loading, error, handleChangeState }: IResponse =
        useFetchData();

    const [query, setQuery] = useState<string>("");

    if (!!error) return <h1>{error}</h1>;

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.target.value);

    return (
        <>
            <Head>
                <title>ZeroQ</title>
                <meta name="description" content="Desafio" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div
                className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
            >
                <main className={styles.main}>
                    <Header />
                    <div className={styles.toolbar}>
                        <SearchInput
                            onChange={handleTextChange}
                            value={query}
                        />
                    </div>
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <CardList
                            data={data?.filter((item) =>
                                item.name
                                    .toLowerCase()
                                    .includes(query.toLowerCase())
                            )}
                            handleChangeState={handleChangeState}
                        />
                    )}
                </main>
            </div>
        </>
    );
});

export default Home;
