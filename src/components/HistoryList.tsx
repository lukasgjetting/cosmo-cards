import React, { useEffect, useState } from "react"
import { FlatList } from "react-native";
import { getHistory } from "../lib/storage";
import { History } from "../types";
import formatDate from "../utils/formatDate";

const HistoryList = () => {
    const [history, setHistory] = useState<History>([]);

    useEffect(() => {
        (async () => {
            setHistory(await getHistory())
        })();
    }, []);

    return (
        <FlatList
        data={history}
        keyExtractor={(i) => `${i.date.toISOString()}-${i.word}`}`
        renderItem={({ item }) => (
            <Text>
                {`[${formatDate(item.date)}] ${item.word}: ${item.result}`}
            </Text>
        )}
        />
    );
};

export default HistoryList;
