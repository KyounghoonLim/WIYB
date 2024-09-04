'use client'

import { GenderType } from 'types/gender.types'
import Button from 'components/button/Button_Primary'
import Form from 'components/form/Form'
import Input_Primary from 'components/input/Input_Primary'
import Radio_Slide from 'components/radio/Radio_Slide'
import { GENDER } from 'constants/gender.constant'
import { PATH } from 'constants/path.constant'
import { setUserProfileApi } from 'services/userApi'
import React, { useCallback, useMemo, useState } from 'react'
import Input_Date from 'components/input/Input_Date'

export default function Form_Sign({ fallback }: { fallback: string }) {
  const [nickname, setNickname] = useState<string>('')
  const [gender, setGender] = useState<GenderType>(GENDER.FEMALE)
  const [birth, setBirth] = useState<Date | string>()

  const genderOptions = useMemo(() => {
    return Object.values(GENDER).map((value) => ({
      label: value === 'FEMALE' ? '여성' : value === 'MALE' ? '남성' : '비밀',
      value: value,
    }))
  }, [])

  const submitHandler = useCallback(async () => {
    try {
      await setUserProfileApi(nickname, gender, birth)
      location.replace(fallback)
    } catch {
      window.alert('회원가입에 실패했습니다.')
    }
  }, [nickname, gender, birth, fallback])

  return (
    <Form onSubmit={submitHandler} className="w-[800px] my-4 gap-8">
      <label htmlFor="sign-nickname" className="label">
        닉네임
        <div className="w-full px-4 bg-white rounded-2xl">
          <Input_Primary
            id="sign-nickname"
            placeholder="2-10자 까지 가능합니다."
            value={nickname}
            onChange={setNickname}
            maxLength={10}
          />
        </div>
      </label>
      <label htmlFor="sign-gender" className="label">
        성별
        <Radio_Slide
          id="sign-gender"
          options={genderOptions}
          value={gender}
          name="sign-gender"
          onChange={setGender}
        />
      </label>
      <label htmlFor="sign-birth" className="label">
        생년월일
        <Input_Date
          id="sign-birth"
          value={birth}
          onChange={setBirth}
          maxDate={new Date(Date.now() - 86400000).toISOString().split('T')[0]}
        />
      </label>
      <Button
        type="submit"
        text="회원가입 완료하기"
        className="button-primary mt-8"
        disabled={!nickname || !gender || !birth}
      />
    </Form>
  )
}
