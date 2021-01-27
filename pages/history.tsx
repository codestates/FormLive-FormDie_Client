import styles from "../styles/History.module.css";
import SearchBar from "../components/SearchBar";
import HistoryForm from "../containers/HistoryForm";
import { HISTORY_LIST_REQUEST } from "../reducers/history";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function History() {
	const [ascPage, setAscPage] = useState<number>(1);
	const [desPage, setDesPage] = useState<number>(1);
	const [Query, setQuery] = useState<string>("");
	const [Sort, setSort] = useState<string | null>(null);
	const dispatch = useDispatch();

	const onChangeAscendingSortHandler = () => {
		setAscPage(1);
		console.log("ascPage : ", ascPage);
		console.log("onChangeAscendingSortHandler");
		const params = {
			page: ascPage,
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
		setDesPage(1);
		const params = {
			page: desPage,
			sort: null,
			q: Query,
		};

		dispatch({
			type: HISTORY_LIST_REQUEST,
			data: params,
		});

		setSort(null);
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
			<HistoryForm
				sort={Sort}
				desPage={desPage}
				setDesPage={setDesPage}
				ascPage={ascPage}
				setAscPage={setAscPage}
			/>
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
