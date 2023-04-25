import * as rssParser from 'react-native-rss-parser';
import { ErrorApi } from './errorGeneralApi';

export const rssApi = async (url: string) => {
    try {
         const response = await fetch(url);
         const responseData = await response.text();
         const rss = await rssParser.parse(responseData);
         return rss.items;
     } catch (error: any) {
         new ErrorApi(
             rssApi.name,
             `Não foi possivel recuperar o feed de notícias: ${error.message}`
         )
     }
 }