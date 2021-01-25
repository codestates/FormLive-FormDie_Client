import styles from "../styles/History.module.css";
import SearchBar from "../components/SearchBar";
import HistoryForm from "../containers/HistoryForm";
import { HISTORY_LIST_REQUEST } from "../reducers/history";

export default function History() {
	return (
		<div className={styles.container}>
			<section className={styles.section1}>
				<section className={styles.section1__topMenu}>
					<span className={styles.section1__article}>History</span>
					<span className={styles.section1__sort}>
						<span>최신순</span>
						<span>|</span>
						<span>인기순</span>
					</span>
					<SearchBar />
				</section>
				<HistoryForm />
			</section>
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
