"use client";
import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";
import { useToast } from "../../../../../components/use-toast";
import {
  canUpload,
  incrementDocumentCount,
} from "../../../../../services/rateLimit";
import { GradientBtn } from "../../../../../components/GradientBtn";
import { calendlyLink, whatsappLink } from "../../../../links";
import { useI18n } from "../../../../../locales/client";

interface DocumentForm {
  name: string;
  content: string;
  source: string;
}

const DocumentCreate: React.FC = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DocumentForm>({
    refineCoreProps: {
      queryOptions: {
        onSuccess: incrementDocumentCount,
      },
    },
  });
  const { toast } = useToast();

  const name = watch(`name`);

  useEffect(() => {
    setValue(`source`, name);
  }, [name, setValue]);

  useEffect(() => {
    errors.root?.message && toast({ title: errors.root?.message });
  }, [errors, toast]);
  const t = useI18n();
  return (
    <Create
      breadcrumb={null}
      isLoading={formLoading}
      title={t(`createDocument.title`)}
      saveButtonProps={{
        ...saveButtonProps,
        title: t(`createDocument.saveButton`),
        children: t(`createDocument.saveButton`),

        onClick: async (p) => {
          if (!(await canUpload())) {
            return toast({
              title: t(`planLimitErrorMessage.documents`),
              description: (
                <Link href={whatsappLink} target="_blank">
                  <GradientBtn>
                    {t(`planLimitErrorMessage.description`)}
                  </GradientBtn>
                </Link>
              ),
            });
          }
          saveButtonProps?.onClick(p);
        },
      }}
    >
      <FormControl mb="3" isInvalid={!!errors?.name}>
        <FormLabel>{t(`name`)}</FormLabel>
        <Input
          id="name"
          type="text"
          {...register(`name`, { required: t(`createDocument.nameRequired`) })}
        />
        <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.content}>
        <FormLabel>{t(`content`)}</FormLabel>
        <Textarea
          id="content"
          {...register(`content`, {
            required: t(`createDocument.contentRequired`),
          })}
        />
        <FormErrorMessage>{`${errors.content?.message}`}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};

export default DocumentCreate;
