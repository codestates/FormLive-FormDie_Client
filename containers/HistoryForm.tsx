import HistoryCard from "../components/HistoryCard";
import styles from "../styles/HistoryForm.module.css";
import { IReducerState } from "../reducers";
import { useSelector } from "react-redux";
import { IHistoryReducerState } from "../reducers/history";

export default function HistoryForm() {
	interface history {
		title: string;
		description: string;
		updated_at: string;
		formList: string[];
	}
	let historyData: history[] = [
		{
			title: "청년내일체움공제",
			description: "한국장학재단",
			updated_at: "2020.01.02",
			formList: ["A", "B", "C"],
		},
		{
			title: "청년내일체움공제",
			description: "한국장학재단",
			updated_at: "2020.01.02",
			formList: ["A", "B", "C"],
		},
		{
			title: "청년내일체움공제",
			description: "한국장학재단",
			updated_at: "2020.01.02",
			formList: ["A", "B", "C"],
		},
		{
			title: "청년내일체움공제",
			description: "한국장학재단",
			updated_at: "2020.01.02",
			formList: ["A", "B", "C"],
		},
		{
			title: "청년내일체움공제",
			description: "한국장학재단",
			updated_at: "2020.01.02",
			formList: ["A", "B", "C"],
		},
		{
			title: "청년내일체움공제",
			description: "한국장학재단",
			updated_at: "2020.01.02",
			formList: ["A", "B", "C"],
		},
	];
	const historyInfo = useSelector<IReducerState, IHistoryReducerState>(
		(state) => state.history
	);
	console.log(historyInfo);
	return (
		<div className={styles.container}>
			{historyInfo.historyList.map((el, idx) => (
				<HistoryCard
					groupId={el.groupId}
					title={el.title}
					updatedAt={el.updatedAt}
					forms={el.forms}
					key={idx}
				/>
			))}
		</div>
	);
}
