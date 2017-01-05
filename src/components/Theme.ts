/**
 * Material Design theme styles.
 */
export enum ThemeStyle
{
    /**
     * Dark theme.
     */
    Dark,
    /**
     * Light theme.
     */
    Light,
    /**
     * Mixed theme.
     */
    Mixed
}

export const DARK_VARIANT_TEXT_FORE:string = "rgba(0, 0, 0, .87)";
export const LIGHT_VARIANT_TEXT_FORE:string =  "white";
export const DARK_VARIANT_DIVIDER:string =  "rgba(0, 0, 0, .12)";
export const LIGHT_VARIANT_DIVIDER:string =  "rgba(255, 255, 255, .12)";
export const DARK_VARIANT_CARD:string =  "#424242";
export const LIGHT_VARIANT_CARD:string =  "white";
export const DARK_VARIANT_BACKGROUND:string =  "#303030";
export const LIGHT_VARIANT_BACKGROUND:string =  "#fafafa";

/**
 * Material Design theme.
 */
export class Theme {
    /**
     * Default colors specified by Material Design swatches.
     */
    static colors = {
        "green": {
            400: "#66BB6A",
            500: "#4CAF50",
            600: "#43A047",
            700: "#388E3C"
        },
        "red": {
            300: "#E57373",
            400: "#EF5350",
            500: "#F44336",
            600: "#E53935",
            700: "#D32F2F"
        },
        "pink": {
            300: "#F06292",
            400: "#EC407A",
            500: "#E91E63",
            600: "#D81B60",
            700: "#C2185B"
        },
        "pink-accent": {
            100: "#FF80AB",
            200: "#FF4081",
            300: "#FF4081",
            400: "#F50057",
            500: "#F50057",
            600: "#C51162",
            700: "#C51162"
        },
        "light-green-accent": {
            100: "#CCFF90",
            200: "#B2FF59",
            300: "#B2FF59",
            400: "#76FF03",
            500: "#76FF03",
            600: "#64DD17",
            700: "#64DD17"
        },
        "yellow": {
            300: "#FFF176",
            400: "#FFEE58",
            500: "#FFEB3B",
            600: "#FDD835",
            700: "#FBC02D"
        },
        "amber": {
            50:  "#FFF8E1",
            100: "#FFECB3",
            200: "#FFE082",
            300: "#FFD54F",
            400: "#FFCA28",
            500: "#FFC107",
            600: "#FFB300",
            700: "#FFA000",
            800: "#FF8F00",
            900: "#FF6F00"
        },
        "indigo": {
            500: "#3F51B5",
            600: "#3949AB",
            700: "#303F9F"
        },
        "blue-grey": {
            50:  "#ECEFF1",
            100: "#CFD8DC",
            200: "#B0BEC5",
            300: "#90A4AE",
            400: "#78909C",
            500: "#607D8B",
            600: "#546E7A",
            700: "#455A64",
            800: "#37474F",
            900: "#263238"
        },
        "teal": {
            50:  "#E0F2F1",
            100: "#B2DFDB",
            200: "#80CBC4",
            300: "#4DB6AC",
            400: "#26A69A",
            500: "#009688",
            600: "#00897B",
            700: "#00796B"
        },
        "blue": {
            50:  "#E3F2FD",
            100: "#BBDEFB",
            200: "#90CAF9",
            300: "#64B5F6",
            400: "#42A5F5",
            500: "#2196F3",
            600: "#1E88E5",
            700: "#1976D2"
        },
        "light-blue": {
            50:  "#E1F5FE",
            100: "#B3E5FC",
            200: "#81D4FA",
            300: "#4FC3F7",
            400: "#29B6F6",
            500: "#03A9F4",
            600: "#039BE5",
            700: "#0288D1",
            800: "#0277BD",
            900: "#01579B"
        },
        "light-green": {
            50:  "#F1F8E9",
            100: "#DCEDC8",
            200: "#C5E1A5",
            300: "#AED581",
            400: "#9CCC65",
            500: "#8BC34A",
            600: "#7CB342",
            700: "#689F38",
            800: "#558B2F",
            900: "#33691E"
        },
        "grey": {
            50:  "#FAFAFA",
            400: "#BDBDBD",
            500: "#9E9E9E",
            600: "#757575",
            700: "#616161"
        },
        "lime": {
            500: "#CDDC39",
            600: "#C0CA33",
            700: "#AFB42B"
        },
        "deep-orange": {
            400: "#FF7043",
            500: "#FF5722",
            600: "#F4511E",
            700: "#E64A19"
        },
        "deep-purple": {
            50:  "#EDE7F6",
            100: "#D1C4E9",
            200: "#B39DDB",
            300: "#9575CD",
            400: "#7E57C2",
            500: "#673AB7",
            600: "#5E35B1",
            700: "#512DA8",
            800: "#4527A0",
            900: "#311B92"
        }
    };

    /**
     * Foreground color of an elevated button in disabled state.
     */
    disabledElevatedFore: string;
    /**
     * Background color of an elevated button in disabled state.
     */
    disabledElevatedBack: string;
    /**
     * Foreground color of a flat button in disabled state.
     */
    disabledFlatFore: string;
    /**
     * Foreground color of a flat button in pressed state.
     */
    flatPressed: string;
    /**
     * Background color of an elevated button in normal state.
     */
    elevatedBack: string;
    /**
     * Background color of an elevated button in pressed state.
     */
    elevatedPressed: string;
    /**
     * Background color of the main view.
     */
    background: string;
    /**
     * Foreground color of any un-styled primary text.
     */
    text: string;
    /**
     * Foreground color of any un-styled secondary text.
     */
    textSecondary: string;
    /**
     * Foreground color of any un-styled hints or disabled text.
     */
    textHint: string;
    /**
     * Foreground color of an active icon.
     */
    iconActive: string;
    /**
     * Foreground color of an inactive icon.
     */
    iconInactive: string;
    /**
     * Foreground color of content dividers.
     */
    divider: string;
    /**
     * Background color of cards.
     */
    card: string;

    /**
     * Primary color for this theme.
     * Specified as a color swatch name.
     */
    color: string;
    /**
     * Accent color for this theme.
     * Specified as a color swatch name.
     */
    accent: string;
    /**
     * Style for this theme.
     */
    style: ThemeStyle;

    /**
     * Background color for the application bar.
     */
    appBarBack: string;
    /**
     * Foreground color for the application bar.
     */
    appBarFore: string;
    /**
     * Foreground color for icons in the application bar.
     */
    appBarIcon: string;
    /**
     * Toolbar style.
     */
    toolbar: ThemeStyle;

    static _instance = null;
    static get instance() {
        if(!Theme._instance)
            Theme._instance = new Theme("indigo", "pink", ThemeStyle.Light, ThemeStyle.Light);

        return Theme._instance;
    }

    constructor(color: string, accent: string, style: ThemeStyle, toolbarStyle: ThemeStyle) {
        // Setup general styles
        switch (style) {
            default:
                this.disabledElevatedFore = "rgba(0, 0, 0, 0.26)";
                this.disabledElevatedBack = "rgba(0, 0, 0, 0.12)";
                this.disabledFlatFore = "rgba(0, 0, 0, 0.26)";
                this.flatPressed = "rgba(153, 153, 153, 0.40)";
                this.elevatedBack = "white";
                this.elevatedPressed = "rgb(224, 224, 224)";
                this.text = "rgba(0, 0, 0, .87)";
                this.textSecondary = "rgba(0, 0, 0, 0.54)";
                this.textHint = "rgba(0, 0, 0, 0.38)";
                this.iconActive = "rgba(0, 0, 0, 0.54)";
                this.iconInactive = "rgba(0, 0, 0, 0.26)";
                break;
            case ThemeStyle.Dark:
                this.disabledElevatedFore = "rgba(255, 255, 255, 0.30)";
                this.disabledElevatedBack = "rgba(255, 255, 255, 0.12)";
                this.disabledFlatFore = "rgba(255, 255, 255, 0.30)";
                this.flatPressed = "rgba(204, 204, 204, 0.25)";
                this.elevatedBack = Theme.colors[color][500];
                this.elevatedPressed = Theme.colors[color][700];
                this.text = "white";
                this.textSecondary = "rgba(255, 255, 255, 0.70)";
                this.textHint = "rgba(255, 255, 255, 0.30)";
                this.iconActive = "white";
                this.iconInactive = "rgba(255, 255, 255, 0.30)";
                break;
        }

        // Setup toolbar styles
        switch(toolbarStyle) {
            default:
                this.appBarBack = "#212121";
                this.appBarFore = "white";
                this.appBarIcon = "dark";
                this.toolbar = ThemeStyle.Light;
                break;
            case ThemeStyle.Light:
                this.appBarBack = "#f5f5f5";
                this.appBarFore = "rgba(0, 0, 0, .87)";
                this.appBarIcon = "dark";
                this.toolbar = ThemeStyle.Dark;
                break;
            case ThemeStyle.Dark:
                this.appBarBack = "#212121";
                this.appBarFore = "white";
                this.appBarIcon = "light";
                this.toolbar = ThemeStyle.Light;
                break;
        }

        // Set theme primary and accent colours
        this.color = color;
        this.accent = accent;
        this.style = style;
    }
}