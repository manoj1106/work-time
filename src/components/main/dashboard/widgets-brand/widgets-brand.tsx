import { cilAppsSettings, cilCalendar, cilCalendarCheck } from '@coreui/icons';
import { CCol, CRow, CWidgetStatsD } from '@coreui/react';
import WidgetBrand from './widget-brand';
import useWorktimeConfigStore from '@/store/useWorktimeConfigStore';
import {
  WorktimeConfig,
  WorktimeConfigType,
} from '@/_helpers/models/worktime.model';

interface ValueType {
  title: string;
  value: any;
}

const WidgetsBrand = () => {
  const worktimeConfigStore = useWorktimeConfigStore();
  const values: ValueType[] = [];
  const worktimeConfig = worktimeConfigStore.worktimeConfig;
  if (worktimeConfig) {
    for (const property in worktimeConfig) {
      if (property === 'id') continue;
      let key = property as keyof WorktimeConfig;
      const value = worktimeConfig[key];
      const title = WorktimeConfigType[property];
      values.push({
        title: title,
        value: value,
      });
    }
  }

  return (
    <CRow>
      <CCol sm={12} lg={6}>
        <WidgetBrand
          icon={cilAppsSettings}
          withCharts={false}
          values={values}
        />
      </CCol>
      <CCol sm={12} lg={6}>
        <WidgetBrand icon={cilCalendar} bgColor='warning' withCharts={true} />
      </CCol>
    </CRow>
  );
};
export default WidgetsBrand;
