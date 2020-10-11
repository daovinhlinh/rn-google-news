import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Linking,
} from "react-native";
import NewsCard from "./components/NewsCard";

const filterArticle = (arr) => {
    const filtered = [];
    arr.forEach((item) => {
        let unique = true;
        filtered.forEach((item1) => {
            const isEqual = JSON.stringify(item) === JSON.stringify(item1);
            if (isEqual) unique = false;
        });
        if (unique) filtered.push(item);
    });
    return filtered;
};

const onPress = (url) => {
    Linking.canOpenURL(url).then((supported) => {
        if (supported) {
            Linking.openURL(url);
        } else {
            console.log(`Don't know how to open URL: ${url}`);
        }
    });
};

export default function App(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasError, setHasError] = useState(false);
    const [lastPageReached, setLastPageReached] = useState(false);

    const getNew = async () => {
        const key = "008ae0a0c5a64ce08f03fe9bda99b7cb";
        try {
            const api = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=5&apiKey=${key}`;
            const response = await fetch(api);
            const news = await response.json();
            const moreArticle = news.articles.length > 0;
            if (moreArticle) {
                const filteredList = filterArticle([...data, ...news.articles]);
                setData(filteredList);
                setPage(page + 1);
            } else {
                setLastPageReached(true);
            }
        } catch (error) {
            setHasError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        getNew();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (hasError) {
        return (
            <View style={styles.container}>
                <Text>{`Has Error :-(`}</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <NewsCard data={item} onPress={() => onPress(item.url)} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Articles Count: </Text>
                <Text style={styles.info}>{data.length}</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
                onEndReached={getNew}
                onEndReachedThreshold={1}
                ListFooterComponent={
                    lastPageReached ? (
                        <View style={{ alignItems: "center" }}>
                            <Text>No more articles</Text>
                        </View>
                    ) : (
                        <ActivityIndicator size="large" color="#0000ff" />
                    )
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 30,
    },
    row: {
        flexDirection: "row",
    },
    label: {
        fontWeight: "bold",
        fontSize: 18,
    },
    info: {
        fontSize: 18,
    },
    button: {
        backgroundColor: "aqua",
        paddingHorizontal: 20,
        paddingVertical: 15,
        margin: 20,
        borderRadius: 15,
    },
});
