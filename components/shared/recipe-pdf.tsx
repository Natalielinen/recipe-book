import { Lang, translation } from "@/translation/translation";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font,
    Link,
} from "@react-pdf/renderer";
import { Soup } from "lucide-react";

Font.register({
    family: "DejaVu",
    src: "/fonts/DejaVuSans.ttf",
});

interface PDFRecipeProps {
    title: string;
    description: string;
    imageUrl: string;
    ingredients: string[];
    lang: string;
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "DejaVu",
        backgroundColor: "#fff",
        flexDirection: "column",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },
    contentRow: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        objectFit: "cover",
    },
    ingredients: {
        flex: 1,
        fontSize: 12,
        paddingLeft: 10,
    },
    description: {
        marginTop: 10,
        fontSize: 12,
        lineHeight: 1.5,
    },
    footer: {
        marginTop: 30,
        fontSize: 10,
        textAlign: "right",
        color: "blue",
    },
});

export const PDFRecipe: React.FC<PDFRecipeProps> = ({
    title,
    description,
    imageUrl,
    ingredients,
    lang,
}) => (
    <Document language={lang}>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.contentRow}>
                {imageUrl ? (
                    <Image source={imageUrl} style={styles.image} />
                ) : (
                    <Soup size={50} />
                )}

                <View style={styles.ingredients}>
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                        {translation[lang as Lang].ingredients}:
                    </Text>
                    {ingredients.map((item, index) => (
                        <Text key={index}>• {item}</Text>
                    ))}
                </View>
            </View>

            <Text style={styles.description}>{description}</Text>

            <View style={styles.footer}>
                <Link src="https://myrecipebook.ru">https://myrecipebook.ru</Link>
            </View>
        </Page>
    </Document>
);
