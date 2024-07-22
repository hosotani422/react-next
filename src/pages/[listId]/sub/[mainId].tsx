import PageSub from '@/components/page/sub';

export default (props: any): JSX.Element => {
  return (
    <PageSub app={props.app} main={props.main} sub={props.sub} />
  );
};
