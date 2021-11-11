import { Navbar } from "../../components/navbar";
import {PageContainer} from "../../components/pageContainer";
import { TopSection } from "./topSection";
import Products from "../../components/Products/Products"
export function HomePage(props)
{
    return (<PageContainer>
        <TopSection>
            <Navbar useTransparent />
        </TopSection>
        <Products />
        </PageContainer>
        );
}