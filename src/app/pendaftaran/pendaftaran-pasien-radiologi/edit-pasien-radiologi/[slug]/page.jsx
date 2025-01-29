'use client';
import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { extractIdFromSlug } from '@/utils/slug';
import { daftarPasien } from '@/utils/config';
import { pemeriksaRadiologi, tindakanDataConfig } from "@/utils/dataTindakan";
import DynamicForm from '@/components/features/dynamic-form/dynamicForm/dynamicForm';
import TindakanTableHarga from "@/components/features/tindakanTableWithHarga/tindakanTableHarga";
import dataWilayah from "@/utils/dataWilayah";
import UseSelectWilayah from "@/lib/hooks/useSelectWilayah";

const PendafttaranRadiologiEditPage = ({params}) => {

  
  return (
    <Fragment>

    </Fragment>
  )
}

export default PendafttaranRadiologiEditPage