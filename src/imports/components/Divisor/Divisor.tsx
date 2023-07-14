import { Divider } from "react-native-paper"
import { divisorStyle } from "./DivisorStyle"

interface IDivisor {
    style?: any;
}

export const Divisor = (props: IDivisor) => {
    const {style} = props;

    return(
        <Divider style={{...divisorStyle.divisor, ...style}} />
    )
}

