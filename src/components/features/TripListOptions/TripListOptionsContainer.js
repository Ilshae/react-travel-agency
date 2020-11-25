import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {
  getAllFilters, 
  changeSearchPhrase, 
  addTag, 
  removeTag,
  changeFromDuration,
  changeToDuration,
} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  // TODO - add more dispatchers for other filters
  addTag: tags => dispatch(addTag(tags)),
  removeTag: tags => dispatch(removeTag(tags)),
  changeFromDuration: value => dispatch(changeFromDuration(value)),
  changeToDuration: value => dispatch(changeToDuration(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
