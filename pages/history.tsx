import styles from "../styles/History.module.css";
import SearchBar from "../components/SearchBar";
import HistoryForm from "../containers/HistoryForm";
import { HISTORY_LIST_REQUEST } from "../reducers/history";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function History() {
	const [Page, setPage] = useState<number>(1);
	const [Query, setQuery] = useState<string>("");
	const [Sort, setSort] = useState<string | null>(null);
	const dispatch = useDispatch();

	const onChangeSortPopularHandler = () => {
		const params = {
			page: Page,
			sort: "popular",
			query: Query,
		};

		dispatch({
			type: HISTORY_LIST_REQUEST,
			data: params,
		});

		setSort("popular");
	};

	const onChangeSortLatestHandler = () => {
		const params = {
			page: Page,
			sort: null,
			query: Query,
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
								onChangeSortLatestHandler();
							}}
						>
							최신순
						</div>
						<div> ｜ </div>
						<div
							onClick={() => {
								onChangeSortPopularHandler();
							}}
						>
							인기순
						</div>
					</div>
				</div>

				<SearchBar setQuery={setQuery} />
			</header>
			<HistoryForm />
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
