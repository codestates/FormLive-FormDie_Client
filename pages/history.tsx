import styles from "../styles/History.module.css";
import SearchBar from "../components/SearchBar";
import HistoryCard from "../components/HistoryCard";
import { IReducerState } from "../reducers";
import {
	HISTORY_LIST_REQUEST,
	IHistoryReducerState,
} from "../reducers/history";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function History() {
	const [ascPage, setAscPage] = useState<number>(1);
	const [desPage, setDesPage] = useState<number>(1);
	const [Query, setQuery] = useState<string>("");
	const [Sort, setSort] = useState<string | null>(null);
	const [ascMoreButton, setAscMoreButton] = useState<boolean>(false);
	const [desMoreButton, setDesMoreButton] = useState<boolean>(true);
	const dispatch = useDispatch();
	const { historyTotal } = useSelector<IReducerState, IHistoryReducerState>(
		(state) => state.history
	);
	const historyInfo = useSelector<IReducerState, IHistoryReducerState>(
		(state) => state.history
	);

	const maxPage = Math.ceil(historyTotal / 10);

	const onChangeAscendingSortHandler = () => {
		setDesMoreButton(false);
		if (!ascMoreButton) {
			setAscMoreButton(!ascMoreButton);
		}

		console.log("ascPage : ", ascPage);
		console.log("onChangeAscendingSortHandler");
		const params = {
			page: 1,
			sort: "asc",
			q: Query,
		};

		dispatch({
			type: HISTORY_LIST_REQUEST,
			data: params,
		});

		setSort("asc");
	};

	const onChangeDescendingSortHandler = () => {
		setAscMoreButton(false);
		if (!desMoreButton) {
			// maxPage 이후 클릭 시 버튼 다시 보이기
			setDesMoreButton(!desMoreButton);
		}
		const params = {
			page: 1,
			sort: null,
			q: Query,
		};

		dispatch({
			type: HISTORY_LIST_REQUEST,
			data: params,
		});

		setSort(null);
	};

	const onClick = () => {
		console.log("maxPage : ", maxPage);
		if (ascPage === maxPage) {
			setAscMoreButton(!ascMoreButton);
			alert("더 이상 불러올 것이 없습니다.");
			setAscPage(1);
		} else if (desPage === maxPage) {
			setDesMoreButton(!desMoreButton);
			alert("더 이상 불러올 것이 없습니다.");
			setDesPage(1);
		} else if (Sort === null) {
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
		} else if (Sort === "asc") {
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
			<header className={styles.header}>
				<div className={styles.header__left}>
					<div className={styles.header__title}>History</div>
					<div className={styles.header__sort}>
						<div
							onClick={() => {
								onChangeDescendingSortHandler();
							}}
						>
							내림차순
						</div>
						<div> ｜ </div>
						<div
							onClick={() => {
								onChangeAscendingSortHandler();
							}}
						>
							오름차순
						</div>
					</div>
				</div>

				<SearchBar where={"history"} setQuery={setQuery} />
			</header>
			<div className={styles.main}>
				{historyInfo.historyList.map((el, idx) => (
					<HistoryCard
						groupId={el.groupId}
						title={el.title}
						updatedAt={el.updatedAt}
						forms={el.forms}
						key={idx}
					/>
				))}
				{desMoreButton && (
					<div onClick={onClick} className={styles.more}>
						...
					</div>
				)}
				{ascMoreButton && (
					<div onClick={onClick} className={styles.more}>
						...
					</div>
				)}
			</div>
		</div>
	);
}
export interface historyQuery {
	q?: string;
	page: number;
	sort?: string;
}
const queryParameter: historyQuery = {
	page: 1,
};
History.getInitialProps = async (context) => {
	context.store.dispatch({
		type: HISTORY_LIST_REQUEST,
		data: queryParameter,
	});
};
