import PageList from '@/components/page/list';

export default (props: any): JSX.Element => {
  return (
    <PageList app={props.app} list={props.list} />
  );
};
