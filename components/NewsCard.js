import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import moment from "moment";
import { Card, Button } from "react-native-elements";
const { width, height } = Dimensions.get("window");
import { Icon } from "react-native-elements";

export default function NewsCard({ onPress, data }) {
    // const { data } = props;
    const {
        title,
        author,
        description,
        content,
        urlToImage,
        publishedAt,
    } = data;
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{title}</Text>
                <Image
                    style={styles.image}
                    source={{
                        uri: urlToImage,
                    }}
                />
            </View>

            <View style={[styles.content, styles.size]}>
                <Text style={styles.label}>Written by {author}</Text>
                <Text style={styles.text}>{description}</Text>
                <Text style={styles.text}>{content}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <Text style={styles.label}>
                        Published {moment(publishedAt).format("LLL")}
                    </Text>
                </View>
                <Button
                    icon={<Icon />}
                    title="Read more"
                    backgroundColor="#03A9F4"
                    style={{ width: width * 0.9 }}
                    onPress={onPress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderBottomWidth: 0.8,
        borderBottomColor: "gray",
        borderRadius: 10,
        padding: 10,
    },
    image: {
        width: width * 0.9,
        height: height * 0.3,
    },
    header: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
    },
    label: {
        fontSize: 19,
        marginBottom: 5,
        color: "#7b7b7b",
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
    },
    headerContainer: {
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
        fontSize: 17,
        marginBottom: 5,
    },
});
