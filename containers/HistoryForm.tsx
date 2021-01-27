import HistoryCard from "../components/HistoryCard";
import styles from "../styles/HistoryForm.module.css";
import { IReducerState } from "../reducers";
import {
	HISTORY_LIST_REQUEST,
	IHistoryReducerState,
} from "../reducers/history";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function HistoryForm({
	sort,
	desPage,
	setDesPage,
	ascPage,
	setAscPage,
}) {
	const historyInfo = useSelector<IReducerState, IHistoryReducerState>(
		(state) => state.history
	);
	const dispatch = useDispatch();
	const { historyTotal } = useSelector<IReducerState, IHistoryReducerState>(
		(state) => state.history
	);

	const onClick = () => {
		const maxPage = Math.ceil(historyTotal / 10);
		console.log("maxPage : ", maxPage);
		if (ascPage === maxPage) {
			setAscPage(1);
			return;
		} else if (desPage === maxPage) {
			setDesPage(1);
			return;
		} else if (sort === null) {
			const params = {
				page: desPage + 1,
				sort: null,
				q: "",
			};

			dispatch({
				type: HISTORY_LIST_REQUEST,
				data: params,
			});
			setDesPage(desPage + 1);
		} else if (sort === "asc") {
			const params = {
				page: ascPage + 1,
				sort: "asc",
				q: "",
			};

			dispatch({
				type: HISTORY_LIST_REQUEST,
				data: params,
			});
			setAscPage(ascPage + 1);
		}
	};
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
			<button onClick={onClick}>more</button>
		</div>
	);
}
