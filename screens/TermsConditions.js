import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import colors from "../configs/colors";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import { get, getWithToken } from "../components/Api";
import Loader from "../components/Loader";

const TermsConditions = () => {
    const [terms, setTerms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        get("staticpage/type/terms")
            .then((res) => {
                console.log(res);
                console.log(res?.data[0]?.description);
                const string = replaceGermanCharIfPresent(res?.data[0]?.description)
                setTerms(string);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
            });
    }, []);

    function replaceGermanCharIfPresent(string) {
        return string
            .replace(/<[^>]*>?/gm, "")
            .replace(/&auml;/g, "ä")
            .replace(/&Auml;/g, "Ä")
            .replace(/&euml;/g, "ë")
            .replace(/&Euml;/g, "Ë")
            .replace(/&Iuml;/g, "Ï")
            .replace(/&iuml;/g, "ï")
            .replace(/&Ouml;/g, "Ö")
            .replace(/&ouml;/g, "ö")
            .replace(/&Uuml;/g, "Ü")
            .replace(/&uuml;/g, "ü")
            .replace(/&#159;/g, "Ÿ")
            .replace(/&yuml;/g, "ÿ")
            .replace(/&ldquo;/g, "“")
            .replace(/&rdquo;/g, "”")
            .replace(/&nbsp;/g, " ")
            .replace(/&lsquo;/g, "'")
            .replace(/&rsquo;/g, "'")
            .replace(/&ndash;/g, "-");
    }

    return (
        <SafeAreaView style={styles.Loadercontainer}>
            <Head
                Icon={false}
                profile={true}
                leftIcon={"arrow-left"}
                title={"Terms & Conditions"}
            />
            {isLoading == true ? (
                <Loader message={"Please Wait..."} size={60} color={colors.primary} />
            ) : (
                <ScrollView
                    style={{
                        marginHorizontal: 15,
                        marginBottom: 15,
                        paddingVertical: 20,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={{ textAlign: "left", lineHeight: 25, fontSize: 16 }}>{terms}</Text>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    Loadercontainer: {
        flex: 1,
    },
});

export default TermsConditions;
