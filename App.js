import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from "react-native";
import NewsCard from "./components/NewsCard";

export default function App() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const getNew = async () => {
        const key = "008ae0a0c5a64ce08f03fe9bda99b7cb";
        const api = `http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${key}`;
        const response = await fetch(api);
        const news = await response.json();
        setData(news.articles);
        setLoading(false);
        console.log(news.articles);
    };

    useEffect(() => {
        getNew();
    }, []);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" loading={loading} />
            </View>
        );
    }

    const renderItem = ({ item }) => <NewsCard data={item} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
            />
            <NewsCard data={data} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
