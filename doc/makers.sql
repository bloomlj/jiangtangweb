-- Sequence: public.files_id_seq

-- DROP SEQUENCE public.files_id_seq;

CREATE SEQUENCE public.files_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 2
  CACHE 1;
ALTER TABLE public.files_id_seq
  OWNER TO postgres;


  -- Sequence: public.makers_id_seq

  -- DROP SEQUENCE public.makers_id_seq;

  CREATE SEQUENCE public.makers_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 6
    CACHE 1;
  ALTER TABLE public.makers_id_seq
    OWNER TO postgres;

    -- Sequence: public.things_id_seq

    -- DROP SEQUENCE public.things_id_seq;

    CREATE SEQUENCE public.things_id_seq
      INCREMENT 1
      MINVALUE 1
      MAXVALUE 9223372036854775807
      START 1
      CACHE 1;
    ALTER TABLE public.things_id_seq
      OWNER TO postgres;



      -- Table: public.makers

      -- DROP TABLE public.makers;

      CREATE TABLE public.makers
      (
        id integer NOT NULL DEFAULT nextval('makers_id_seq'::regclass),
        login character varying(100), -- 最好使用电子邮件
        password character varying(100),
        name character varying(50),
        about text,
        created_at timestamp without time zone,
        updated_at timestamp without time zone,
        avatar character varying(255),
        sex character(1), -- 性别，男或者女
        idcard character varying(20), -- 身份证号或者学号
        rfid character varying(255), -- rfid卡号
        mobile character varying(20), -- 手机号码
        qq character varying(20), -- qq号码
        profield character varying(255), -- 专业领域
        CONSTRAINT makers_pkey PRIMARY KEY (id)
      )
      WITH (
        OIDS=FALSE
      );
      ALTER TABLE public.makers
        OWNER TO postgres;
      COMMENT ON COLUMN public.makers.login IS '最好使用电子邮件';
      COMMENT ON COLUMN public.makers.sex IS '性别，男或者女';
      COMMENT ON COLUMN public.makers.idcard IS '身份证号或者学号';
      COMMENT ON COLUMN public.makers.rfid IS 'rfid卡号';
      COMMENT ON COLUMN public.makers.mobile IS '手机号码';
      COMMENT ON COLUMN public.makers.qq IS 'qq号码';
      COMMENT ON COLUMN public.makers.profield IS '专业领域';




  -- Table: public.files

  -- DROP TABLE public.files;

  CREATE TABLE public.files
  (
    id integer NOT NULL DEFAULT nextval('files_id_seq'::regclass),
    maker_id integer,
    org_name character varying(255),
    category character varying(50),
    mimetype character varying(50),
    filename character varying(255),
    note character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
  )
  WITH (
    OIDS=FALSE
  );
  ALTER TABLE public.files
    OWNER TO postgres;



    -- Table: public.things

    -- DROP TABLE public.things;

    CREATE TABLE public.things
    (
      id integer NOT NULL DEFAULT nextval('things_id_seq'::regclass),
      maker_id integer,
      title character varying(255),
      cover character varying(255),
      abstract text,
      content jsonb,
      category jsonb,
      copyright character varying(50),
      created_at timestamp without time zone,
      updated_at timestamp without time zone
    )
    WITH (
      OIDS=FALSE
    );
    ALTER TABLE public.things
      OWNER TO postgres;
