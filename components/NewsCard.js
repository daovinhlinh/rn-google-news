import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function NewsCard({ data }) {
    // const { data } = props;
    const { title, author, description, content, img } = data;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>{title}</Text>
                <Image
                    style={styles.image}
                    source={{
                        uri: img,
                    }}
                />
            </View>
            <View style={[styles.content, styles.size]}>
                <Text
                    style={[styles.text, { color: "gray", fontWeight: "bold" }]}
                >
                    {author}
                </Text>
                <Text style={styles.text}>{description}</Text>
                <Text style={styles.text}>{content}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        padding: 10,
    },
    image: {
        width: width * 0.9,
        height: height * 0.2,
    },
    header: {
        alignItems: "center",
    },
    size: {
        width: width * 0.9,
    },
    content: {
        justifyContent: "flex-start",
        marginTop: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 5,
    },
});
