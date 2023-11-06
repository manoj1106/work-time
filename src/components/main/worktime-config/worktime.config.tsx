'use client';
import 'reflect-metadata';
import { container } from 'tsyringe';
import useWorktimeConfig from '@/_helpers/hooks/useWorktimeConfig';
import Card from '@/components/widgets/card/card';
import Input from '@/components/widgets/input/input';
import { CButton, CCol, CForm, CRow } from '@coreui/react';
import { WorktimeConfigValidator } from '@/_helpers/validation/worktime.validator';
import { saveWorktimeConfig } from '@/client/service-wrapper/worktime.service';
import { ApiResponse } from '@/_helpers/api/response.model';
import { useState } from 'react';
import Message from '@/components/widgets/message/message';

const WorktimeConfig = () => {
  const [response, setResponse] = useState<ApiResponse>();
  const {
    inputs,
    errors,
    setErrors,
    handleInputChange,
    handleWeeklyHoursBlur,
    handleDailyHoursBlur,
    handleWorktimeConfigReset,
  } = useWorktimeConfig();
  const handleWorktimeConfigSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse(undefined);
    const worktimeConfigValidator = container.resolve(WorktimeConfigValidator);
    if (worktimeConfigValidator.validateInputs(inputs, setErrors)) {
      const response: ApiResponse = await saveWorktimeConfig(inputs);
      setResponse(response);
    }
  };
  return (
    <Card
      headers={{
        title: 'Worktime Config',
        subtitle: 'Default worktime configuration',
      }}
    >
      <CForm onSubmit={handleWorktimeConfigSave} noValidate>
        <p className='text-dark text-align-center'>
          Work time default configuration
        </p>
        <CRow>
          <CCol sm={12} md={6} lg={4}>
            <Input
              id='monthlyTargetHours'
              label='Monthly Target Hours'
              type='text'
              placeholder='Monthly Target Hours'
              name='monthlyTargetHours'
              value={inputs.monthlyTargetHours}
              onChange={handleInputChange}
              error={errors.monthlyTargetHours}
              required={true}
              rest={{ step: '.01' }}
            />
          </CCol>
          <CCol sm={12} md={6} lg={4}>
            <Input
              id='weeklyTargetHours'
              label='Weekly Target Hours'
              type='text'
              placeholder='Weekly Target Hours'
              name='weeklyTargetHours'
              value={inputs.weeklyTargetHours}
              onChange={handleInputChange}
              error={errors.weeklyTargetHours}
              required={true}
              onBlur={handleWeeklyHoursBlur}
              rest={{ step: '.01', pattern: '^d+(?:.d{1,2})?$' }}
            />
          </CCol>
          <CCol sm={12} md={6} lg={4}>
            <Input
              id='dailyTargetHours'
              label='Daily Target Hours'
              type='text'
              placeholder='Daily Target Hours'
              name='dailyTargetHours'
              value={inputs.dailyTargetHours}
              onChange={handleInputChange}
              error={errors.dailyTargetHours}
              required={true}
              onBlur={handleDailyHoursBlur}
              rest={{ step: '.01', pattern: '^d+(?:.d{1,2})?$' }}
            />
          </CCol>
          <CCol sm={12} md={6} lg={4}>
            <Input
              id='defaultBreakTime'
              label='Default Break Time (in Minutes)'
              type='text'
              placeholder='Default Break Time'
              name='defaultBreakTime'
              value={inputs.defaultBreakTime}
              onChange={handleInputChange}
              error={errors.defaultBreakTime}
              rest={{ step: '.01', pattern: '^d+(?:.d{1,2})?$' }}
            />
          </CCol>
          <CCol sm={12} md={6} lg={4}>
            <Input
              id='yearlyVacationDays'
              label='Yearly Vacation Days'
              type='text'
              placeholder='Yearly Vacation Days'
              name='yearlyVacationDays'
              value={inputs.yearlyVacationDays}
              onChange={handleInputChange}
              error={errors.yearlyVacationDays}
              required={true}
              rest={{ pattern: '^d+$' }}
            />
          </CCol>
          <CCol sm={12} md={6} lg={4}>
            <Input
              id='vacationHours'
              label='Vacation Hours'
              type='text'
              placeholder='Vacation Hours'
              name='vacationHours'
              value={inputs.vacationHours}
              onChange={handleInputChange}
              error={errors.vacationHours}
              required={true}
              rest={{ step: '.01', pattern: '^d+(?:.d{1,2})?$' }}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={6} md={3} lg={1}>
            <CButton color='success' className='px-4' type='submit'>
              Save
            </CButton>
          </CCol>
          <CCol xs={6} md={3} lg={1}>
            <CButton
              color='danger'
              className='px-4'
              type='button'
              onClick={handleWorktimeConfigReset}
            >
              Reset
            </CButton>
          </CCol>
        </CRow>
        <CRow className='pt-4 pb-4'>
          <CCol xs={12}>
            <Message response={response} />
          </CCol>
        </CRow>
      </CForm>
    </Card>
  );
};
export default WorktimeConfig;
