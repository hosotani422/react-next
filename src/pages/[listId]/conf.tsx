import PageConf from '@/components/page/conf';

export default (props: any): JSX.Element => {
  return (
    <PageConf app={props.app} conf={props.conf} />
  );
};
