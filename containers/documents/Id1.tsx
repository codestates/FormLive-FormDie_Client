import React from "react";
import { Page, Text, Image } from "@react-pdf/renderer";
import { styles } from "../../styles/FormComplete/preview";

const Id1 = ({ formData }) => {
	const today: string[] = new Date().toLocaleDateString("ko").split(". ");
	const serviceStart: string[] = formData?.serviceStart?.split("-");
	const serviceEnd: string[] = formData?.serviceEnd?.split("-");
	const jobStart: string[] = formData?.jobStart?.split("-");

	// * 양식 제출 완료 되었을 때 PDF 형식으로 보여주는 기능으로 @react-pdf/renderer 라이브러리를 사용했습니다.
	// * 라이브러리에서 사용한 것은 PDF의 페이지를 렌더하기 위한 Page, 서버에서 받아온 데이터를 렌더하기 위한 Text, 이미지를 렌더하기 위한 Image을 사용했습니다.
	// * 아래에 Image의 src를 보면 저희가 고생했던 NextJS에서 이미지를 가져오기 위해 next-images 라이브러리를 설치하여 require로 이미지를 불러올 수 있는 것을 확인할 수 있습니다.
	return (
		<Page>
			<Image src={require("../../public/form/Id1.png")} style={styles.image} />
			<Text style={styles.text__name}>{formData?.name}</Text>
			<Text style={styles.text__birthday}>
				{formData?.birth?.replace(/-/g, ". ")}
			</Text>
			<Text style={styles.text__numbers}>{formData?.phone}</Text>
			<Text style={styles.text__position}>{formData?.position}</Text>
			<Text style={styles.text__gender}>{formData?.gender}</Text>
			<Text style={styles.text__email}>{formData?.email}</Text>
			<Text style={styles.text__company}>{formData?.company}</Text>
			<Text style={styles.text__job}>{formData?.job}</Text>
			<Text style={styles.text__sign__year}>{today[0]}</Text>
			<Text style={styles.text__sign__month}>{today[1]}</Text>
			<Text style={styles.text__sign__day}>{today[2].slice(0, -1)}</Text>

			{formData?.service === "필" && (
				<Text style={styles.text__service__start__year1}>
					{serviceStart[0]?.slice(2, 4)}
				</Text>
			)}

			{formData?.service === "필" && (
				<Text style={styles.text__service__start__month1}>
					{serviceStart[1]}
				</Text>
			)}

			{formData?.service === "필" && (
				<Text style={styles.text__service__start__date1}>
					{serviceStart[2]}
				</Text>
			)}

			{formData?.service === "필" && (
				<Text style={styles.text__service__end__year1}>
					{serviceEnd[0]?.slice(2, 4)}
				</Text>
			)}

			{formData?.service === "필" && (
				<Text style={styles.text__service__end__month1}>{serviceEnd[1]}</Text>
			)}

			{formData?.service === "필" && (
				<Text style={styles.text__service__end__date1}>{serviceEnd[2]}</Text>
			)}

			{formData?.service === "전역예정" && (
				<Text style={styles.text__service__start__year2}>
					{serviceStart[0]?.slice(2, 4)}
				</Text>
			)}

			{formData?.service === "전역예정" && (
				<Text style={styles.text__service__start__month2}>
					{serviceStart[1]}
				</Text>
			)}

			{formData?.service === "전역예정" && (
				<Text style={styles.text__service__start__date2}>
					{serviceStart[2]}
				</Text>
			)}

			{formData?.service === "전역예정" && (
				<Text style={styles.text__service__end__year2}>
					{serviceEnd[0]?.slice(2, 4)}
				</Text>
			)}

			{formData?.service === "전역예정" && (
				<Text style={styles.text__service__end__month2}>{serviceEnd[1]}</Text>
			)}

			{formData?.service === "전역예정" && (
				<Text style={styles.text__service__end__date2}>{serviceEnd[2]}</Text>
			)}

			{formData?.service === "전역예정" && (
				<Text style={styles.text__job__start__year}>
					{jobStart[0]?.slice(2, 4)}
				</Text>
			)}

			{formData?.service === "전역예정" && (
				<Text style={styles.text__job__start__month}>{jobStart[1]}</Text>
			)}

			{formData?.service === "전역예정" && (
				<Text style={styles.text__job__start__date}>{jobStart[2]}</Text>
			)}

			{(formData?.school === "중학교" || formData?.school === "고등학교") && (
				<Text style={styles.text__academic__year1}>
					{formData?.finalYear?.slice(2, 4)}
				</Text>
			)}

			{formData?.school === "대학교" && (
				<Text style={styles.text__academic__year2}>
					{formData?.finalYear?.slice(2, 4)}
				</Text>
			)}

			{(formData?.school === "중학교" || formData?.school === "고등학교") && (
				<Text style={styles.text__academic__school}>
					{formData?.schoolName}
				</Text>
			)}

			{formData?.school === "대학교" && (
				<Text style={styles.text__academic__university}>
					{formData?.schoolName}
				</Text>
			)}

			{(formData?.school === "중학교" || formData?.school === "고등학교") && (
				<Text style={styles.text__academic__grade1}>
					{formData?.grade?.slice(0, 1)}
				</Text>
			)}

			{formData?.school === "대학교" && (
				<Text style={styles.text__academic__grade2}>
					{formData?.grade?.slice(0, 1)}
				</Text>
			)}

			<Text style={styles.text__academic__university_department}>
				{formData?.major}
			</Text>
			<Text style={styles.text__sign__name}>{formData?.name}</Text>

			{formData?.service === "필" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__military1}
				/>
			)}
			{formData?.service === "미필" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__military2}
				/>
			)}
			{formData?.service === "면제" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__military3}
				/>
			)}
			{formData?.service === "해당없음" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__military4}
				/>
			)}
			{formData?.service === "전역예정" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__military5}
				/>
			)}

			{formData?.graduate === "졸업" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__academic1}
				/>
			)}
			{formData?.graduate === "수료" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__academic2}
				/>
			)}
			{formData?.graduate === "중퇴" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__academic3}
				/>
			)}
			{formData?.graduate === "휴학" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__academic4}
				/>
			)}
			{formData?.graduate === "졸업예정" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__academic5}
				/>
			)}
			{formData?.graduate === "재학" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__academic6}
				/>
			)}

			{formData?.school === "중학교" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__school1}
				/>
			)}
			{formData?.school === "고등학교" && (
				<Image
					src={require("../../public/image/015-check-mark.png")}
					style={styles.checkImg__school2}
				/>
			)}
		</Page>
	);
};

export default Id1;
