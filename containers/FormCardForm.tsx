import { IReducerState } from "../reducers";
import { FormCardReducerState } from "../reducers/form";
import { useSelector } from "react-redux";
import FormCard from "../components/FormCard";
import styles from "../styles/FormCard.module.css";

export default function FormCardForm() {
	const { formCardList } = useSelector<IReducerState, FormCardReducerState>(
		(state) => state.form
	);
	let data = formCardList.data.content;
	console.log(formCardList);
	//* 날짜 자르기
	data = data.map((el) => {
		if (el.updated_at) {
			const end = el.updated_at.search("T");
			el.updated_at = el.updated_at.slice(0, end);
			return el;
		} else {
			return el;
		}
	});
	return (
		<div className={styles.section2__formData}>
			{data.map((el, idx) => (
				<FormCard
					formId={el.formId}
					title={el.title}
					description={el.description}
					updated_at={el.updated_at}
					key={idx}
				/>
			))}
		</div>
	);
}
