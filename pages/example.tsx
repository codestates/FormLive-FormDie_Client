/*
next.js 와의 서버사이드 랜더링 호환성 문제로 여기는 작동하지 않음.
*/


//import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import { IReducerState } from "../reducers";
import { Iuser } from "../containers/UserProfile";
import HomeFormCard from "../components/HomeFormCard";
import {
  FORM_LIST_REQUEST,
  IFormReducerState,
  FORM_GROUP_REQUEST,
} from "../reducers/form";
import HomeFormGroupCard from "../components/HomeFormGroupCard";
import { GET_USER_REQUEST } from "../reducers/user";

import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import dynamic from 'next/dynamic';


const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDoc = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

/*
    <div className="App">
      <PDFDownloadLink document={<MyDoc />} fileName="yangSikDangDoc.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "다운로드"
        }
      </PDFDownloadLink>
    </div>
const ResumeContainer = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && (
        <PDFDownloadLink document={
          <PdfDocument 
            headerNodes={data.allGoogleSheetHeaderRow.edges}
          />
        } fileName="resume.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download my resume')}
        </PDFDownloadLink> 
      )}
    </>
  );
}
*/

const PdfViewer = dynamic(
  () => import('./PdfViewer'),
  { ssr: false }
);

const example = () => {

  return (
    <>
      { (
        <PDFDownloadLink document={
          <MyDoc />
        } fileName="resume.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download my resume')}
        </PDFDownloadLink> 
      )}
    </>
  );
}

example.getInitialProps = async (context) => {
  // const state = context.store.getState();
  // 이 직전에 LOAD_USERS_REQUEST

  context.store.dispatch({
    type: GET_USER_REQUEST,
  });
};


export default example;
