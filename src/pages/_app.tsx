import "@/styles/tailwind.css";
import "@/locales/i18next";
import "@/utils/base/events";
import type { AppProps } from "next/app";
import * as NextRouter from "next/router";
import * as immer from 'use-immer';
import * as reactI18next from "react-i18next";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import conf from "@/stores/page/conf";
import calendar from "@/stores/popup/calendar";
import clock from "@/stores/popup/clock";
import dialog from "@/stores/popup/dialog";
import notice from "@/stores/popup/notice";
import PageMain from "@/components/page/main";
import PopupCalendar from '@/components/popup/calendar';
import PopupClock from '@/components/popup/clock';
import PopupDialog from '@/components/popup/dialog';
import PopupNotice from '@/components/popup/notice';

export default ({ Component, pageProps }: AppProps) => {
  [list.state, list.temp.setState] = immer.useImmer<typeof list.state>(list.state);
  [main.state, main.temp.setState] = immer.useImmer<typeof main.state>(main.state);
  [sub.state, sub.temp.setState] = immer.useImmer<typeof sub.state>(sub.state);
  [conf.state, conf.temp.setState] = immer.useImmer<typeof conf.state>(conf.state);
  [calendar.state, calendar.temp.setState] = immer.useImmer<typeof calendar.state>(calendar.state);
  [clock.state, clock.temp.setState] = immer.useImmer<typeof clock.state>(clock.state);
  [dialog.state, dialog.temp.setState] = immer.useImmer<typeof dialog.state>(dialog.state);
  [notice.state, notice.temp.setState] = immer.useImmer<typeof notice.state>(notice.state);
  app.temp.router = NextRouter.useRouter();
  app.temp.i18next = reactI18next.useTranslation();
  app.handle.init();
  return (
    <>
      <PageMain app={app} list={list} main={main}>
        <Component {...pageProps} app={app} list={list} main={main} sub={sub} conf={conf} />
      </PageMain>
      <PopupCalendar calendar={calendar} />
      <PopupClock clock={clock} />
      <PopupDialog app={app} dialog={dialog} />
      <PopupNotice notice={notice} />
    </>
  );
}
