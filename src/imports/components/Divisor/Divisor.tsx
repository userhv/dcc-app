import { Divider, useTheme } from "react-native-paper"
import { divisorStyle } from "./DivisorStyle"

interface IDivisor {
    style?: any;
}

export const Divisor = (props: IDivisor) => {
    const {style} = props;

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const stylesDivisor = divisorStyle(colors);

    return(
        <Divider style={{...stylesDivisor.divisor, ...style}} />
    )
}

