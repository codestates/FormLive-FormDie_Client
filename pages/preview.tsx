import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IReducerState } from "../reducers";
import { Iuser } from "../containers/UserProfile";
import { GET_USER_REQUEST } from "../reducers/user";
import { styles } from "../styles/preview";
import { Page, Text, Document, PDFViewer, Image } from "@react-pdf/renderer";

const MyDoc = ({ userInfo }) => {
	const uri: string = "https://yangsikdang.ml:5000/user/icon/example.png";
	console.log(userInfo);
	return (
		<Document>
			<Page>
				<Image
					src={require("../public/image/formPreview-min.png")}
					style={styles.image}
				/>
				{/* <Image src={uri} /> */}
				<Text style={styles.text__name}>{userInfo.name}</Text>
				<Text style={styles.text__birthday}>21.01.29</Text>
				<Text style={styles.text__numbers}>010-1234-1234</Text>
				<Text style={styles.text__position}>팀장</Text>
				<Text style={styles.text__gender}>asb</Text>
				<Text style={styles.text__email}>{userInfo.email}</Text>
				<Text style={styles.text__company}>asb</Text>
				<Text style={styles.text__job}>asb</Text>
				<Text style={styles.text__sign__year}>2021</Text>
				<Text style={styles.text__sign__month}>01</Text>
				<Text style={styles.text__sign__day}>29</Text>
				<Text style={styles.text__academic__year1}>2021</Text>
				<Text style={styles.text__academic__year2}>2021</Text>
				<Text style={styles.text__academic__school}>코딩</Text>
				<Text style={styles.text__academic__university}>코딩</Text>
				<Text style={styles.text__academic__university_department}>컴공</Text>
				<Text style={styles.text__sign__name}>{userInfo.name}</Text>

				<Image
					src={require("../public/image/015-check-mark.png")}
					style={styles.checkImg__military1}
				/>
				<Image
					src={require("../public/image/015-check-mark.png")}
					style={styles.checkImg__military2}
				/>
				<Image
					src={require("../public/image/015-check-mark.png")}
					style={styles.checkImg__military3}
				/>
				<Image
					src={require("../public/image/015-check-mark.png")}
					style={styles.checkImg__military4}
				/>
				<Image
					src={require("../public/image/015-check-mark.png")}
					style={styles.checkImg__military5}
				/>
				<Image
					src={require("../public/image/015-check-mark.png")}
					style={styles.checkImg__academic1}
				/>
				<Image
					src={require("../public/image/015-check-mark.png")}
					style={styles.checkImg__academic2}
				/>
				<Image
					src={require("../public/image/015-check-mark.png")}
					style={styles.checkImg__academic3}
				/>
				<Image
					src={require("../public/image/015-check-mark.png")}
					style={styles.checkImg__academic4}
				/>
				<Image
					src={require("../public/image/015-check-mark.png")}
					style={styles.checkImg__academic5}
				/>
				<Image
					src={require("../public/image/015-check-mark.png")}
					style={styles.checkImg__academic6}
				/>

				{/* {userInfo.map((el, index) => {
					return (
						<Text key={index}>{el}</Text>
				})} */}
			</Page>
		</Document>
	);
};

export default function preview() {
	const [isClient, setIsClient] = useState(false);
	const userInfo = useSelector<IReducerState, Iuser>((state) => state.user.me);
	useEffect(() => {
		setIsClient(true);
	}, []);
	return (
		<div>
			{isClient && (
				<PDFViewer style={styles.viewer}>
					<MyDoc userInfo={userInfo} />
				</PDFViewer>
			)}
		</div>
	);
}

preview.getInitialProps = async (context) => {
	// const state = context.store.getState();
	// 이 직전에 LOAD_USERS_REQUEST

	context.store.dispatch({
		type: GET_USER_REQUEST,
	});
};