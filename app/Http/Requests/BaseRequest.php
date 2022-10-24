<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class BaseRequest
 * @package App\Http\Requests
 */
class BaseRequest extends FormRequest
{

    const PARAMS_KEY = [
        'FIELDS' => 'fields',
        'WITH' => 'with'
    ];

    /**
     * @param $prefix
     * @param $accessFields
     * @return array[]
     */
    public function getQueryParams($prefix, $accessFields): array
    {
        return [
            self::PARAMS_KEY['FIELDS'] => self::getQueryFields($prefix, $accessFields)
        ];
    }

    /**
     * @param string $prefix
     * @param array $accessFields
     * @return array
     */
    public function getQueryFields($prefix = '', $accessFields = []): array
    {
        $fieldValues = [];
        $fields = [];

        $fieldsData = $this->get(self::PARAMS_KEY['FIELDS']);

        if ($fieldsData !== null) {
            $fieldValues = array_map(function ($fieldValue) {
                return trim($fieldValue);
            }, explode(',', $fieldsData));
        }

        foreach ($accessFields as $accessField) {
            if (!$fieldValues || in_array($accessField, $fieldValues)) $fields[] = $prefix . $accessField;
        }

        return $fields;
    }
}
