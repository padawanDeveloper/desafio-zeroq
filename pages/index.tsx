import { useCallback } from "react";
import Head from "next/head";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";

import Header from "@/components/header";
import SearchInput from "@/components/search";
import Card from "@/components/card";
import useFetchData from "@/hooks/useFetchOffices";

import { OfficeData, Line } from "@/types/common";

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
}

const reduceLines = (data: Array<Line>) =>
    data.reduce<Line>(
        (acc, item) => {
            return {
                waiting: item.waiting + acc.waiting,
                elapsed: item.elapsed + acc.elapsed,
            };
        },
        { waiting: 0, elapsed: 0 }
    );

export default function Home() {
    const { data, loading, error }: IResponse = useFetchData();

    if (!!error) return <h1>{error}</h1>;

    const handleReduceLines = useCallback(
        (data: Array<Line>) => reduceLines(data),
        []
    );

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
                            onChange={() => console.log()}
                            value={""}
                        />
                    </div>
                    {loading ? (
                        <h1>Cargando sucursales...</h1>
                    ) : (
                        <div className={styles.cardList}>
                            {data?.map(
                                ({ name, online, id, lines }: OfficeData) => {
                                    const line = handleReduceLines(lines);
                                    return (
                                        <Card
                                            key={id}
                                            office={name}
                                            line={{
                                                waiting: line.waiting,
                                                elapsed:
                                                    line.elapsed / lines.length,
                                            }}
                                            active={online}
                                        />
                                    );
                                }
                            )}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
